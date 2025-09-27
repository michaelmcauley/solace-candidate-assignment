export default function DetailWithIcon({ icon, detail }: { icon: string, detail: string }) {
  return (
    <div className="detail-with-icon">
      <i className={`fa-solid fa-${icon}`}></i>
      <span>{detail}</span>
    </div>
  );
}