import useUserStore from "@zustand/userStore";

export default function MainPage() {
  const { user } = useUserStore();

  console.log(user);
  return <div>MainPage</div>;
}
