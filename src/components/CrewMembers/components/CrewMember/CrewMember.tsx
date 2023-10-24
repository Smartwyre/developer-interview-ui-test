import React from 'react';
import type { CrewMember } from "@/hooks/useCrewMembers/useCrewMembers"

interface CrewMemberProps {
  data: CrewMember;
}

const CrewMember = (props: CrewMemberProps) => {
  return (
    <div>
      <p>{props.data.name}</p>
      <p>{props.data.status}</p>
    </div>
  )
}

export default CrewMember;