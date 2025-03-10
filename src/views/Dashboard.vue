<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      
      <!-- Tabs -->
      <Tabs default-value="today" class="w-auto">
        <TabsList>
          <TabsTrigger value="today">Hôm nay</TabsTrigger>
          <TabsTrigger value="week">Tuần này</TabsTrigger>
          <TabsTrigger value="month">Tháng này</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Revenue Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng doanh thu</h3>
          <DollarSign class="h-5 w-5 text-gray-400" />
        </div>
        <div class="text-3xl font-bold mb-2">$45,231.89</div>
        <div class="flex items-center text-sm">
          <span class="text-green-500 flex items-center">
            <TrendingUp class="h-4 w-4 mr-1" />
            +20.1%
          </span>
          <span class="text-gray-500 dark:text-gray-400 ml-2">so với tháng trước</span>
        </div>
      </div>
      
      <!-- New Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Người dùng mới</h3>
          <Users class="h-5 w-5 text-gray-400" />
        </div>
        <div class="text-3xl font-bold mb-2">+2,350</div>
        <div class="flex items-center text-sm">
          <span class="text-green-500 flex items-center">
            <TrendingUp class="h-4 w-4 mr-1" />
            +10.1%
          </span>
          <span class="text-gray-500 dark:text-gray-400 ml-2">so với tháng trước</span>
        </div>
      </div>
      
      <!-- New Orders Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Đơn hàng mới</h3>
          <ShoppingCart class="h-5 w-5 text-gray-400" />
        </div>
        <div class="text-3xl font-bold mb-2">+573</div>
        <div class="flex items-center text-sm">
          <span class="text-red-500 flex items-center">
            <TrendingDown class="h-4 w-4 mr-1" />
            -3.2%
          </span>
          <span class="text-gray-500 dark:text-gray-400 ml-2">so với tháng trước</span>
        </div>
      </div>
      
      <!-- Active Licenses Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">License đang hoạt động</h3>
          <Key class="h-5 w-5 text-gray-400" />
        </div>
        <div class="text-3xl font-bold mb-2">12,234</div>
        <div class="flex items-center text-sm">
          <span class="text-green-500 flex items-center">
            <TrendingUp class="h-4 w-4 mr-1" />
            +4.6%
          </span>
          <span class="text-gray-500 dark:text-gray-400 ml-2">so với tháng trước</span>
        </div>
      </div>
    </div>
    
    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
        <h3 class="text-lg font-medium mb-4">Doanh số theo thời gian</h3>
        <div class="h-80">
          <LineChart 
            :chartData="revenueData" 
            :options="lineChartOptions" 
          />
        </div>
      </div>
      
      <!-- License Distribution Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium mb-4">Phân bổ loại License</h3>
        <div class="h-80">
          <BarChart 
            :chartData="licenseTypeData" 
            :options="barChartOptions" 
          />
        </div>
      </div>
    </div>
    
    <!-- Recent Activity Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Recent Orders -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium mb-4">Đơn hàng gần đây</h3>
        <div class="space-y-4">
          <div v-for="(order, index) in recentOrders" :key="index" class="flex items-start">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
              <ShoppingCart class="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p class="font-medium">{{ order.title }}</p>
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ order.time }}</p>
                <Badge :variant="order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'">
                  {{ order.status }}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" class="w-full mt-4">Xem tất cả đơn hàng</Button>
      </div>
      
      <!-- Recent Licenses -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium mb-4">License gần đây</h3>
        <div class="space-y-4">
          <div v-for="(license, index) in recentLicenses" :key="index" class="flex items-start">
            <div class="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
              <KeyIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p class="font-medium">{{ license.title }}</p>
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ license.time }}</p>
                <p class="text-xs text-gray-500">{{ license.code }}</p>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" class="w-full mt-4">Xem tất cả license</Button>
      </div>
      
      <!-- New Users -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium mb-4">Người dùng mới</h3>
        <div class="space-y-4">
          <div v-for="(user, index) in newUsers" :key="index" class="flex items-center">
            <Avatar class="h-10 w-10 mr-4">
              <AvatarImage :src="`https://avatar.vercel.sh/${user.email}`" />
              <AvatarFallback>{{ user.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div>
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
            </div>
          </div>
        </div>
        <Button variant="outline" class="w-full mt-4">Xem tất cả người dùng</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Key, 
  TrendingUp, 
  TrendingDown,
  User,
  CreditCard,
  KeyIcon,
  Settings
} from 'lucide-vue-next'
import { LineChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@/components/ui/avatar'

// Register Chart.js components
Chart.register(...registerables)

// Chart data
const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Doanh thu',
      data: [1200, 1900, 1500, 2200, 2600, 2800, 3000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
})

const licenseTypeData = ref({
  labels: ['Standard', 'Pro', 'Enterprise', 'Trial'],
  datasets: [
    {
      label: 'Số lượng',
      data: [40, 30, 20, 10],
      backgroundColor: '#3b82f6',
      borderRadius: 6
    }
  ]
})

// Chart options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: true,
        drawBorder: false,
        color: 'rgba(200, 200, 200, 0.2)'
      },
      ticks: {
        callback: (value: number) => `$${value}`
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false,
        color: 'rgba(200, 200, 200, 0.2)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

// Recent orders
const recentOrders = [
  {
    title: 'Đơn hàng #12345',
    time: '2 giờ trước',
    status: 'completed'
  },
  {
    title: 'Đơn hàng #12346',
    time: '3 giờ trước',
    status: 'pending'
  },
  {
    title: 'Đơn hàng #12347',
    time: '5 giờ trước',
    status: 'failed'
  },
  {
    title: 'Đơn hàng #12348',
    time: '1 ngày trước',
    status: 'completed'
  }
]

// Recent licenses
const recentLicenses = [
  {
    title: 'License kích hoạt cho user@example.com',
    time: '2 giờ trước',
    code: 'LICENSE-ABC123'
  },
  {
    title: 'License kích hoạt cho user2@example.com',
    time: '3 giờ trước',
    code: 'LICENSE-DEF456'
  },
  {
    title: 'License kích hoạt cho user3@example.com',
    time: '5 giờ trước',
    code: 'LICENSE-GHI789'
  },
  {
    title: 'License kích hoạt cho user4@example.com',
    time: '1 ngày trước',
    code: 'LICENSE-JKL012'
  }
]

// New users
const newUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com'
  },
  {
    name: 'Robert Johnson',
    email: 'robert@example.com'
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com'
  }
]

// Fetch data on component mount
onMounted(() => {
  // In a real app, you would fetch data from an API here
  console.log('Dashboard component mounted')
})
</script> 