import { Devit } from "components/Devit";

export default function DevitPage(props) {
    return (
        <>
            <Devit {...props} />
        </>
    );
}

export async function getServerSideProps(context) {
    // context has Params, res, req, query
    const { params, res } = context;
    const { id } = params;

    const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);
    if (apiResponse.ok) {
        const props = await apiResponse.json();
        return { props: props };
    }

    if (res) {
        res.writeHead(301, { Location: "/home" }).end();
    }
}

// DevitPage.getInitialProps = (context) => {
//     const { query, res } = context;
//     const { id } = query;

//     return fetch(`http://localhost:3000/api/devits/${id}`).then(
//         (apiResponse) => {
//             if (apiResponse.ok) return apiResponse.json();
//             if (res) {
//                 res.writeHead(301, { Location: "/home" }).end();
//             }
//         }
//     );
// };
