import Canvas from "./Canvas";
import { useParams } from "react-router-dom";

export default function Orange() {
  const params = useParams();
  return (
    <div>
      <Canvas workflowID={params.id} />
    </div>
  );
}
