import { Link } from "../Link";

export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <p>Aplicación para aprender a hacer un react router!</p>
      <Link href="/about">Ir al About!</Link>
      <Link href="/search/java">Ir al Java!</Link>
      <Link href="/search/javascript">Ir al JavaScript!</Link>
    </main>
  );
}
