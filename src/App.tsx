import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {TopLevelTable} from "./components/TopLevelTable.tsx";

const queryClient = new QueryClient();
export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
                <TopLevelTable/>
            <ReactQueryDevtools position="bottom-right"/>
        </QueryClientProvider>
    )
}