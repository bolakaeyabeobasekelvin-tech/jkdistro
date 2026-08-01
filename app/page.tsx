import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Reviews } from '@/components/home/Reviews';
import { Faq } from '@/components/home/Faq';
import { BlogSection } from '@/components/home/BlogSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Reviews />
      <Faq />
      <BlogSection limit={4} />
    </>
  );
}
