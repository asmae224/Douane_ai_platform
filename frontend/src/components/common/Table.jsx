const Table = ({ children }) => {

    return (

        <div
            className="
                overflow-x-auto
                rounded-xl
                border
                border-slate-200
            "
        >

            <table
                className="
                    min-w-full
                    border-collapse
                "
            >

                {children}

            </table>

        </div>

    );

};

export default Table;