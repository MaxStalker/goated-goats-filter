import { useParams } from "react-router";

export default function SingleGoat(props) {
  const { data } = props;
  const { goatId } = useParams();

  const goat = data[goatId];

  return !goat ? (
    <div>No goat found...</div>
  ) : (
    <div>
      <img src={goat.image} width="200px" />
      <p>SkinScore: {goat.skinScore}</p>
      {
        goat.equippedTraits.map((trait)=>{
          return(
            <div key={trait.id}>
              <img src={trait.image} width="200px" />
              <p>TraitScore: {trait.traitScore}</p>
            </div>
          )
        })
      }
    </div>
  );
}
