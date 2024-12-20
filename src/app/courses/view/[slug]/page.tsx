import { getCourseBySlug } from "@/utils/helpers/getCourseBySlug";
import React from "react";
import Image from "next/image";

import {
  BookOpen,
  Clock,
  BarChart,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { notFound } from "next/navigation";
import Link from "next/link";
import PaymentClient from "@/components/payment-client";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const course = await getCourseBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: course?.title
      ? `AviatorJonah | ${course.title}`
      : "AviatorJonah | Course",
    description: course?.description
      ? `${course.description.slice(0, 150)}...`
      : "AviatorJonah | Course",
    openGraph: {
      images: [course?.image ?? "", ...previousImages],
    },
  };
}

async function ViewCourse({ params }: Props) {
  const slug = (await params).slug;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const sortedModules = course.modules.sort(
    (a, b) => a.order_index - b.order_index
  );

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-start space-x-2 mb-5">
        <Link href="/courses">
          <span className="text-md text-neutral-600 dark:text-neutral-400">
            All Courses
          </span>
        </Link>
        <ChevronRight className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
        <span className="text-md text-indigo-600 dark:text-indigo-400">
          {course.title}
        </span>
      </div>
      <div className="lg:hidden block mb-5">
        <Card className="sticky top-24 overflow-hidden bg-white dark:bg-neutral-900 shadow-xl">
          <Image
            src={course.image ?? ""}
            alt={course.title}
            width={600}
            height={400}
            className="w-full h-32 object-cover"
          />
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {formatPrice(course.price ?? 0)}
              </div>
            </div>
            <PaymentClient
              selectedCourse={{
                id: course.id,
                price: course.price ?? 0,
                title: course.title ?? "",
                description: course.description ?? "",
                image: course.image ?? "",
                slug: course.slug ?? "",
              }}
              buttonStyles={"bg-indigo-600 hover:bg-indigo-700 text-white"}
              enrolled={course.enrollments.length > 0}
              isAuthenticated={true}
            />
            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Instructor: {course.instructor}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: {formatDate(course.updated_at ?? "")}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            {course.title}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
            {course.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-md">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <span>{course.category}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-md">
              <Clock className="h-5 w-5 text-indigo-500" />
              <span>{Math.ceil((course.completion_time ?? 0) / 60)} hours</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-md">
              <BarChart className="h-5 w-5 text-indigo-500" />
              <span>{course.level}</span>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
              Course Curriculum
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {sortedModules.map((module) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger className="text-left">
                    <div>
                      {module.title}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-normal">
                        {module.description}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3">
                      {module.lessons
                        .sort(
                          (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
                        )
                        .map((lesson) => (
                          <li
                            key={lesson.id}
                            className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg"
                          >
                            <div className="font-medium">{lesson.title}</div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {lesson.description}
                            </p>
                            <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                              Reading time: {lesson.reading_time} minutes
                            </div>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="hidden lg:block">
          <Card className="sticky top-24 overflow-hidden bg-white dark:bg-neutral-900 shadow-xl">
            <Image
              src={course.image ?? ""}
              alt={course.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {formatPrice(course.price ?? 0)}
                </div>
              </div>
              <PaymentClient
                selectedCourse={{
                  id: course.id,
                  price: course.price ?? 0,
                  title: course.title ?? "",
                  description: course.description ?? "",
                  image: course.image ?? "",
                  slug: course.slug ?? "",
                }}
                buttonStyles={"bg-indigo-600 hover:bg-indigo-700 text-white"}
                enrolled={course.enrollments.length > 0}
                isAuthenticated={true}
              />
              <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Instructor: {course.instructor}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last updated: {formatDate(course.updated_at ?? "")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default ViewCourse;
