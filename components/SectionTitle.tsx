export default function SectionTitle({ ghost, title }: { ghost: string; title: string }) {
  return (
    <div className="stitle reveal">
      <span aria-hidden="true" className="ghost orb">
        {ghost}
      </span>
      <h2 className="orb">{title}</h2>
    </div>
  );
}
