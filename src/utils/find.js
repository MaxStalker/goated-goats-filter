import { query } from "flow-cadut";

export const resolveAddress = async (address) => {
  const code = `
  import FIND from 0x097bafa4e0b48eef
  import Profile from 0x097bafa4e0b48eef

    pub fun main(address: Address) : String?{
      let account=getAccount(address)
      let leaseCap = account.getCapability<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>(FIND.LeasePublicPath)
      if !leaseCap.check() {
        return nil
      }
      let profile= Profile.find(address).asProfile()
      let leases = leaseCap.borrow()!.getLeaseInformation() 
      var time : UFix64?= nil
      var name :String?= nil
      for lease in leases {
        //filter out all leases that are FREE or LOCKED since they are not actice
        if lease.status != "TAKEN" {
          continue
        }
        //if we have not set a 
        if profile.findName == "" {
          if time == nil || lease.validUntil < time! {
            time=lease.validUntil
            name=lease.name
          }
        }
        if profile.findName == lease.name {
          return lease.name
        }
      }
      return name
    }
  `;

  const args = [address];
  return query({ code, args });
};
