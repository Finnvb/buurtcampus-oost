import Layout from "components/layout";
import UserProfile from "/components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage() {
  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default ProfilePage;
