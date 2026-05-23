import HomePageClient from "@/components/home/HomePageClient";

type SearchParamValue = string | string[] | undefined;

type HomePageProps = {
  searchParams?: Promise<Record<string, SearchParamValue>> | Record<string, SearchParamValue>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});

  return <HomePageClient searchParams={resolvedSearchParams} />;
};

export default HomePage;
