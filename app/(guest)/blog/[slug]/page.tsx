const DetailBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div>
      <h1>Hello {slug}</h1>
    </div>
  );
};

export default DetailBlogPage;
