import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Helmet, HelmetProvider } from "react-helmet-async"

import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"

import { usePortfolio } from "../contexts/PortfolioContext"
import Portfolio from "./Portfolio"



export default function Project() {
    const { projectId } = useParams()
    const numericalId = projectId ? parseInt(projectId.split("-")[0]) : ""
    const { projects, loadPortfolio } = usePortfolio()
    const [project, setProject] = useState(projects ? projects.filter((proj) => proj.projectId === numericalId).length > 0 ? projects.filter((proj) => proj.id === numericalId)[0] : null : null)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = async () => {
            await loadPortfolio()
        }
        return unsubscribe
    }, [])

    useEffect(() => {
        if (!projects) return
        const unsubscribe = () => {
            if (!/^[0-9]|$/g.test(projectId.split("-")[0])) {
                setError("Invalid project ID")
            }
            else if (projects.filter((proj) => proj.projectId === numericalId).length === 0) {
                setError("Project not found")
            }
            else {
                setProject(projects.filter((proj) => proj.projectId === numericalId)[0])
            }
        }
        unsubscribe()
    }, [projects])

    useEffect(() => {
        if (!project) return
        const unsubscribe = () => {
            if (projectId !== project.url) navigate(`/portfolio/${project.url}`)
        }
        unsubscribe()
    }, [project])

    const handleBack = () => {
        navigate("/portfolio")
    }



    // Loading
    if (!projects || (projects.filter((p) => p.projectId === numericalId).length === 0 && !error)) return (
        <HelmetProvider>
            <Helmet>
                <title>Project Loading... - Isaiah Wiesner</title>
            </Helmet>
            <Navbar />
            <div className="page grid place-items-center">
                <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-center">Loading Project...</h3>
                    <Spinner size="3xl" />
                </div>
            </div>
        </HelmetProvider>
    )
    
    // Waiting on state
    if (!project && !error) return (
        <>
            <Navbar />
            <div className="page"></div>
        </>
    )

    // Error
    if (!project) return (
        <HelmetProvider>
            <Helmet>
                <title>{error} - Isaiah Wiesner</title>
            </Helmet>
            <Navbar />
            <div className="page flex flex-col items-center">
                <div className="mt-40 flex flex-col gap-4 items-center">
                    <h3 className="text-center">Unable to Load Project</h3>
                    <p>Error: {error}. Please check the URL and try again.</p>
                </div>
            </div>
        </HelmetProvider>
    )

    // View Project
    return (
        <HelmetProvider>
            <Portfolio />
            <Helmet>
                <title>{project.name} - Isaiah Wiesner</title>
            </Helmet>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-30 page secondary-bg bg-opacity-50 dark:bg-opacity-50 flex flex-col gap-2" onClick={handleBack}></div>
            <div className="card bg-opacity-100 dark:bg-opacity-100 fixed top-[10vh] max-h-[80vh] z-40 w-[90%] mx-[5%] sm:w-[30rem] sm:mx-[calc((100%-30rem)/2)] lg:w-[50rem] lg:mx-[calc((100%-50rem)/2)]">
                <h1>{project.name}</h1>
            </div>
        </HelmetProvider>
    )
}