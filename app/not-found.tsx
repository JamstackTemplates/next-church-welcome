import { EmptyPew } from '../components/church-art';
import { TileLink } from '../components/church-layout';

export default function NotFound() {
  return <section className="wrap section-space grid justify-items-center gap-5 text-center">
    <div className="w-full max-w-md"><EmptyPew /></div>
    <h1 className="section-title max-w-3xl">We saved you a seat, but not on this page.</h1>
    <nav aria-label="Find another page" className="flex flex-wrap justify-center gap-3">
      <TileLink href="/">Home</TileLink>
      <TileLink href="/visit/">Visit</TileLink>
      <TileLink href="/events/">Events</TileLink>
    </nav>
  </section>;
}
