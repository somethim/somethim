export default function NotFoundPage() {
  return (
    <main className="error-page">
      <p className="section-index">404 / Route unavailable</p>
      <h1>Nothing is running here.</h1>
      <p>
        The requested path does not exist. Return to the engineering profile to
        continue.
      </p>
      <a className="button button-primary" href="/">
        Return home <span aria-hidden="true">←</span>
      </a>
    </main>
  );
}
