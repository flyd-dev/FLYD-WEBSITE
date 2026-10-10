/**
 * template.tsx monteres på nytt ved hvert sideskifte, så innholdet glir inn
 * hver gang (kun transform – se .side-inn i globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="side-inn">{children}</div>;
}
