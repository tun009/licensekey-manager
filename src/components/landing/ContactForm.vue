<template>
  <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Liên hệ với chúng tôi</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="name">Họ tên</Label>
          <Input id="name" v-model="formData.name" placeholder="Nguyễn Văn A" required />
        </div>
        
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="formData.email" type="email" placeholder="example@email.com" required />
        </div>
      </div>
      
      <div class="space-y-2">
        <Label for="subject">Tiêu đề</Label>
        <Input id="subject" v-model="formData.subject" placeholder="Tiêu đề tin nhắn của bạn" required />
      </div>
      
      <div class="space-y-2">
        <Label for="message">Nội dung</Label>
        <Textarea 
          id="message" 
          v-model="formData.message" 
          placeholder="Nhập nội dung tin nhắn của bạn ở đây..." 
          rows="5"
          required
        />
      </div>
      
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" v-model="formData.acceptTerms" />
        <Label for="terms" class="text-sm">
          Tôi đồng ý với <a href="#" class="text-primary hover:underline">Điều khoản dịch vụ</a> và <a href="#" class="text-primary hover:underline">Chính sách bảo mật</a>
        </Label>
      </div>
      
      <Button type="submit" class="w-full" :disabled="!formData.acceptTerms">Gửi tin nhắn</Button>
      
      <Alert v-if="showSuccessMessage" variant="success" class="mt-4">
        <CheckCircle class="h-4 w-4 mr-2" />
        <AlertTitle>Thành công!</AlertTitle>
        <AlertDescription>
          Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
        </AlertDescription>
      </Alert>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CheckCircle } from 'lucide-vue-next'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  acceptTerms: false
})

const showSuccessMessage = ref(false)

const handleSubmit = () => {
  // In a real app, you would send the form data to your backend
  console.log('Form submitted:', formData.value)
  
  // Show success message
  showSuccessMessage.value = true
  
  // Reset form after 3 seconds
  setTimeout(() => {
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      acceptTerms: false
    }
    showSuccessMessage.value = false
  }, 3000)
}
</script> 