
export const ErrorComponent = ({error}) => {
    return (
        <center>
            <div className="container mt-3">
                <div className="alert alert-warning col-sm-4" role="alert">
                    Folgender Fehler trat auf: {error.errorCode}
                </div>
            </div>
        </center>
    );
}