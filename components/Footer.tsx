import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          {/* <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">关于商会</h3>
            <p className="text-sm text-gray-600">我们致力于促进商业合作、推动行业发展、为会员提供全方位服务与支持。</p>
          </div> */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="text-sm text-gray-600">
              <li className="mb-2"><Link href="/about" className="hover:text-primary">关于我们</Link></li>
              <li className="mb-2"><Link href="/register" className="hover:text-primary">会员注册</Link></li>
              <li className="mb-2"><Link href="/events" className="hover:text-primary">商会活动</Link></li>
              <li className="mb-2"><Link href="/coupons" className="hover:text-primary">优惠券</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="text-sm text-gray-600">
              <li className="mb-2 flex items-center"><Phone className="h-4 w-4 mr-2" /> 123-456-7890</li>
              <li className="mb-2 flex items-center"><Mail className="h-4 w-4 mr-2" /> info@chamber.com</li>
              <li className="mb-2 flex items-center"><MapPin className="h-4 w-4 mr-2" /> 北京市朝阳区商会大厦</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><Linkedin className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center text-gray-600">
          <p>&copy; 2023 商会平台. 保留所有权利.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-primary">隐私政策</Link> | 
            <Link href="/terms" className="hover:text-primary ml-2">使用条款</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

