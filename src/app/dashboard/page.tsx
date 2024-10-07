import { Protect, UserButton } from "@clerk/nextjs";
function Dashboard(){
    return(
        <div>
            hello
            <UserButton/>
        </div>
    )
}
export default function ProtectedDashboard() {
    return (
        <Protect>
            <Dashboard />
        </Protect>
    )
}

