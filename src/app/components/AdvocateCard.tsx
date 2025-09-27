import { Advocate } from "../types";
import DetailWithIcon from "./DetailWithIcon";
import { formatPhoneNumber } from "../utils";

export default function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const yearsOfExperience = advocate.yearsOfExperience > 1 ? `${advocate.yearsOfExperience} years of experience` : `${advocate.yearsOfExperience} year of experience`;
  const phoneNumber = formatPhoneNumber(advocate.phoneNumber);
  return (
    <div className="card">
      <h2>{advocate.firstName} {advocate.lastName}</h2>
      <div className="advocate-details">
        <DetailWithIcon icon="graduation-cap" detail={advocate.degree} />
        <DetailWithIcon icon="calendar" detail={yearsOfExperience} />
        <DetailWithIcon icon="location-dot" detail={advocate.city} />
        <DetailWithIcon icon="phone" detail={phoneNumber} />
      </div>
      <hr />
      <div>
        <h3>Specialties</h3>
        {advocate.specialties.join(", ")}
      </div>
    </div>
  );
}
