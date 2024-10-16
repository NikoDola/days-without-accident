import ListAllEmployees from '@/components/ListAllEmployees'
import withAuth from "@/components/withAuth";

export default async function dashBoard() {
    return(
        <ListAllEmployees/>
    )
}
