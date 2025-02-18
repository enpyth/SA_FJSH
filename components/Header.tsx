'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@mui/material"
import { Home, Info, User, FileText, Building2, Calendar, Files } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="FJSH Logo" width={200} height={100} style={{ width: "100%", height: "100%" }}/>
          </Link>
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <Button variant="text" startIcon={<Home></Home>}><Link href="/"> 首页</Link></Button>
              <Button variant="text" startIcon={<Info></Info>}><Link href="/about"> 商会简介</Link></Button>
              <Button variant="text" startIcon={<Building2></Building2>}><Link href="/enterprises"> 企业会员</Link></Button>
              <Button variant="text" startIcon={<Calendar></Calendar>}><Link href="/events"> 商会活动</Link></Button>
              {/* <Button variant="text" startIcon={<FileText></FileText>}><Link href="/meetings"> 理事会议</Link></Button> */}
              <Button variant="text" startIcon={<Files></Files>}><Link href="/news"> 新闻资讯</Link></Button>
              <Button variant="text" startIcon={<User></User>}><Link href="/protected"> 我的</Link></Button>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

