import Badge from "../common/Badge";

const DocumentStatusBadge = ({ status }) => {

    const statusConfig = {

        UPLOADED: {
            label: "Uploadé",
            color: "blue",
        },

        INDEXED: {
            label: "Indexé",
            color: "green",
        },

        FAILED: {
            label: "Échec",
            color: "red",
        },

    };

    const config = statusConfig[status] || {
        label: status,
        color: "gray",
    };

    return (

        <Badge color={config.color}>

            {config.label}

        </Badge>

    );

};

export default DocumentStatusBadge;