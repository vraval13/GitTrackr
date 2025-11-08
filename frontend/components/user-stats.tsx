interface UserStatsProps {
  label: string
  value: number
  icon: string
}

export function UserStats({ label, value, icon }: UserStatsProps) {
  let bgColor = ""
  if (label === "Public Repos") bgColor = "bg-lightblue-50"
  else if (label === "Followers") bgColor = "bg-pink-100"
  else if (label === "Following") bgColor = "bg-green-50"
  return (
    <div className={`p-4 ${bgColor} bg-blue-900/50   rounded-lg shadow-md`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <p className="text-grey-900 text-md font-bold text-black">{label}</p>
      </div>
      <p className="text-2xl font-bold text-black">{value.toLocaleString()}</p>
    </div>
  )
}
