
const projectExternalLinkModel = {
    select: `
      id,
      name,
      description,
      live_url,
      image_url,
      external_links (
        id,
        title,
        icon,
        url
      )
    `,
    filters: [],
    order: {
      column: "id",
      ascending: false
    }
  };
  
  export default projectExternalLinkModel;
  