//styles
import "./Home.scss"
//redux
// import { useSelector } from "react-redux"
// import { selectFirestore } from "../../redux/firestoreSlice/firestoreSlice"
//hooks
import { useCollection } from "../../hooks/useCollection"
//ts
import ProjectList from "../../components/projectList/ProjectList"
import { ProjectDocument } from "../../interfaces/Collections"




export default function Home() {

    // const { fireStoreSliceError, document, loading } = useSelector(selectFirestore)
    const { documents, error } = useCollection<ProjectDocument>("projects")


    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {documents && <ProjectList projects={documents} />}
        </div>
    )
}
