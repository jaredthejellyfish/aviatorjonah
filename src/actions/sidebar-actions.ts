'use server'

export async function addModule(courseSlug: string) {
  console.log('Adding module to course:', courseSlug)
  // Here you would typically add the module to the database
  // For now, we're just logging the courseSlug
}

export async function addLesson(courseSlug: string, moduleSlug: string) {
  console.log('Adding lesson to module:', moduleSlug, 'in course:', courseSlug)
  // Here you would typically add the lesson to the database
  // For now, we're just logging the courseSlug and moduleSlug
}

