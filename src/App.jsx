import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import { PortfolioProvider } from "./contexts/PortfolioContext"
import { ThemeProvider } from "./contexts/ThemeContext"

import LandingPage from "./pages/LandingPage"
import Portfolio from "./pages/Portfolio"
import Project from "./pages/Project"
import Contact from "./pages/Contact"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminCreateUser from "./pages/admin/users/AdminCreateUser"
import RedirectPage from "./components/RedirectPage"



function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <PortfolioProvider>
                        <Routes>
                            <Route exact path="/" element={<LandingPage />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/portfolio/:projectId" element={<Project />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/redirect/:link" element={<RedirectPage />} />

                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin/users/create" element={<AdminCreateUser />} />
                        </Routes>
                    </PortfolioProvider>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    )
}

export default App
