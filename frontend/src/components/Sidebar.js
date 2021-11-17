
import React, { useState } from "react"
import SimpleBar from 'simplebar-react'
import { useLocation } from "react-router-dom"
import { CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUserFriends, faProjectDiagram, faBrain, faCogs} from "@fortawesome/free-solid-svg-icons"
import { Nav, Badge, Image, Dropdown } from '@themesberg/react-bootstrap'
import { Link } from 'react-router-dom'

import { Routes } from "../routes"
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg"

export default (props = {}) => {
  const location = useLocation()
  const { pathname } = location
  const [show, setShow] = useState(false)
  const showClass = show ? "show" : ""

  const onCollapse = () => setShow(!show)

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : ""
    const navItemClassName = link === pathname ? "active" : ""
    const linkProps = external ? { href: link } : { as: Link, to: link }

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    )
  }

  return (
    <>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Friend Finder" icon={faUserFriends} />
              <NavItem title="MBTI Classification" link={Routes.MBTI.path} icon={faBrain} />
              <NavItem title="Networking" icon={faProjectDiagram} link={Routes.Networking.path} />
              <NavItem title="Demo" icon={faCogs} link={Routes.Demo.path} />
              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  )
}
