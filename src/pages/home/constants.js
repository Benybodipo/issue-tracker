const getLabel = (issue, _label) => {
    if (!issue.labels.length) {
        return "";
    }
    
    const tmp = issue.labels.find((label) => {
        const [type, value] = label?.name?.split(':');
        return type.toLowerCase() === _label
    })

    return tmp?.name?.split(':')[1].trim();
}

export const formatData = (data) => {
    return data.map((issue) => {
        return {
            number: issue.number,
            title: issue.title,
            description: issue.body,
            client: getLabel(issue, 'c'),
            priority: getLabel(issue, 'p'),
            type: getLabel(issue, 't'),
            status: issue.state,
            assigned_to: issue.assignee

        }
    })
};

export const columns = [
    {
        field: 'number',
        headerName: 'Number',
        sortable: true,
    },
    {
        field: 'title',
        headerName: 'Title',
        sortable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
    },
    {
        field: 'client',
        headerName: 'Client',
        sortable: true,
    },
    {
        field: 'priority',
        headerName: 'Priority',
        sortable: true,
    },
    {
        field: 'type',
        headerName: 'Type',
        sortable: true,
    },
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 5;

export default {};