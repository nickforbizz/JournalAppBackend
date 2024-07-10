let JournalCategoryComponent = {
    type: "object",
    required: ["title", "active", "content", "userId"],
    properties: {
        id: {
            type: "integer",
            description: "The auto-generated id of the journal category"
        },
        title: {
            type: "string",
            description: "Title of the journal category"
        },
        active: {
            type: "boolean",
            description: "Indicates if the journal category is active"
        },
        content: {
            type: "string",
            description: "Content of the journal category"
        },
        userId: {
            type: "integer",
            description: "ID of the user who owns the journal category"
        }
    },
    example: {
        id: 1,
        title: "My Journal Category",
        active: true,
        content: "This is a journal category content",
        userId: 1,
        createdAt: "2021-07-21T17:32:28Z",
        updatedAt: "2021-07-21T17:32:28Z"
    }
}

module.exports = {
    JournalCategoryComponent
}