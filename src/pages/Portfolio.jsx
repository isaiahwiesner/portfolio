import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"

import Project from "../models/Project"
import { Link } from "react-router-dom"
import { usePortfolio } from "../contexts/PortfolioContext"



export default function Portfolio() {
    const { projects, loadPortfolio } = usePortfolio()

    useEffect(() => {
        const unsubscribe = async () => {
            await loadPortfolio()
        }
        unsubscribe()
    }, [])



    // Loading
    if (!projects) return (
        <HelmetProvider>
            <Helmet>
                <title>Portfolio - Isaiah Wiesner</title>
            </Helmet>
            <div className="page grid place-items-center">
                <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-center">Loading Portfolio...</h3>
                    <Spinner size="3xl" />
                </div>
            </div>
        </HelmetProvider>
    )

    // View projects
    return (
        <HelmetProvider>
            <Helmet>
                <title>Portfolio - Isaiah Wiesner</title>
            </Helmet>
            <Navbar active="portfolio" />
            <div className="page flex flex-col gap-8">
                <h1>Portfolio</h1>
                {projects.length > 0 ? (
                    <div className="project-list-container">
                        {projects.map((p) => {
                            let project = new Project(p)
                            return (
                                <Link key={project.projectId} to={`/portfolio/${project.url}`} title={project.name}>
                                    <div className="project-list-item">
                                        <div className="info">
                                            <h3>{project.name}</h3>
                                            <p>
                                                {project.description}
                                            </p>
                                            <h6 className="secondary-text">
                                                {project.releaseDate ? new Date(project.releaseDate).toLocaleDateString() : "Unreleased"}
                                            </h6>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 items-center">
                        <h3 className="text-center">No projects to display.</h3>
                    </div>
                )}
            </div>
        </HelmetProvider>
    )
}