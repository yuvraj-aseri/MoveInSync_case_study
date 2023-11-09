//cuts
import Datatable from "../Pages/Contacts/dataTable/ContactDataTable";
import NewForm from "../Pages/Contacts/forms/AddContact";
import EditForm from "../Pages/Contacts/forms/EditContact";
import { Route, Routes } from "react-router-dom";

export const GlobalRoute = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Datatable />} />
                <Route path="/">
                    <Route
                        path="new"
                        element={<NewForm />}
                    />
                    <Route
                        path="edit/:id"
                        element={<EditForm />}
                    />
                </Route>
            </Route>
        </Routes>
    )
}