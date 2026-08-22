type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  titleId: string;
};

export const SectionHeading = ({
  index,
  label,
  title,
  description,
  titleId,
}: SectionHeadingProps) => (
  <header className="section-heading">
    <p className="section-index">
      {index} / {label}
    </p>
    <div>
      <h2 id={titleId}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  </header>
);
