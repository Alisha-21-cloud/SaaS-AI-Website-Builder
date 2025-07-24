interface Props{
    params: Promise<{
        projectId: string;
    }>
}

const page = async ({ params }: Props) => {
    const { projectId } = await params;

  return (
    <div>
        Project id: {projectId}
    </div>
  )
}

export default page