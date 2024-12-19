import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BarChart, Users, BookOpen, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import RecentSalesWidget from '@/components/Admin/RecentSalesWidget'
import PopularCoursesWidget from '@/components/Admin/PopularCoursesWidget'
import RevenueChart from '@/components/Admin/RevenueChart'

export default async function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSalesWidget />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Popular Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <PopularCoursesWidget />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild>
              <Link href="/admin/courses/new">Create New Course</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/users">Manage Users</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/settings">System Settings</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>3 courses need review</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>User engagement up by 12%</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>5 new instructor applications</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/courses">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Add, edit, or remove courses</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/analytics">
          <Card className="hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed site analytics and reports</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
