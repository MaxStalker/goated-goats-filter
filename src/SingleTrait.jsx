import { useParams } from "react-router";

export default function SingleTrait(props) {
  const { data } = props;
  const { traitId } = useParams();

  return <div>Single trait - {traitId}</div>;
}
