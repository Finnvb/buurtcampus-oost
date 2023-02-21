import { useRouter } from "next/router";
import NavBar from "components/NavBar";
function PlantDetailPage() {
  const router = useRouter();

  const plantId = router.query.plantId;

  console.log(plantId);
  return (
    <>
      <p>PlantId: {plantId}</p>
    </>
  );
}

export default PlantDetailPage;
