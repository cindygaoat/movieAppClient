import Movies from "./Movies"
export default function Home() {

    return(
        <>
            <div className="text-center m-5 justify-content-center">
            <h1 className="fw-bold">Welcome to Movie Catalog.</h1>
            <h2 className="fw-bold">Browse your favorite movies</h2>
            <Movies />
            </div>
        </>
    )
}