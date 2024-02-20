import React, { useContext, useEffect, useState } from "react"
import Project from "../models/Project"
import { sortData } from "../functions/misc"



const PortfolioContext = React.createContext()

export function usePortfolio() {
    return useContext(PortfolioContext)
}

export function PortfolioProvider({ children }) {
    const [projects, setProjects] = useState(null)
    const [searchStr, setSearchStr] = useState("")
    const [order, setOrder] = useState("releaseDate,-name")
    const [searchedProjects, setSearchedProjects] = useState(null)

    useEffect(() => {
        const unsubscribe = async () => {
            await loadPortfolio()
        }
        return unsubscribe
    }, [])

    useEffect(() => {
        if (!projects) return
        const unsubscribe = () => {
            if (searchStr.trim() === "") {
                setSearchedProjects(sortData(projects, order))
            }
            else {
                setSearchedProjects(sortData(projects.filter((proj) => {
                    return proj.name.toLowerCase().includes(searchStr.trim().toLowerCase())
                }), order))
            }
        }
        unsubscribe()
    }, [projects, searchStr, order])



    async function loadPortfolio() {
        const q = await Project.getProjects()
        setProjects(sortData(q, order))
    }

    async function loadProject(projectId) {
        const p = await Project.getProjectById(projectId)
        if (!p) return
        setProjects(sortData([...projects.filter(proj => proj.projectId), p], order))
    }



    const value = {
        projects,
        searchedProjects,
        searchStr, setSearchStr,
        order, setOrder,
        loadPortfolio,
        loadProject,
    }



    return (
        <PortfolioContext.Provider value={value}>
            {children && children}
        </PortfolioContext.Provider>
    )
}