import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./firebase-config";

export default function ChildrenList({ path }) {
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);

  return (
    <div>
      {loading && "Loading..."}
      {docs?.map((doc) => {
        if (doc.isCorrect === "true") {
          return (
            <li key={Math.random()} style={{ listStyleType: "lower-alpha" }}>
              {doc.text} (true answer)
            </li>
          );
        } else {
          return (
            <li key={Math.random()} style={{ listStyleType: "lower-alpha" }}>
              {doc.text}
            </li>
          );
        }
      })}
    </div>
  );
}
