import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { Col, Nav, Row } from "react-bootstrap";

export const meta: MetaFunction = () => {
  return [
    { title: "AoC 2023" },
    { name: "description", content: "Advent of Code 2023!" },
  ];
};

const nav = [
  { url: "/day1", text: "Day 1" },
  // { url: "/day2", text: "Day 2" },
];

export default function Index() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="container">
      <Row>
        <Col>
          <h1>Advent of Code 2023</h1>
        </Col>
        <Col>
          <h1 className="text-end">
            <Link
              className="link-light"
              to="https://github.com/glitchassassin/aoc-2023"
            >
              <i className="bi-github" />
            </Link>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <Nav variant="underline" className="flex-sm-column">
            {nav.map(({ url, text }) => (
              <Nav.Link
                key={url}
                as={Link}
                className="link-light"
                to={url}
                active={location.pathname.startsWith(url)}
              >
                {text}
              </Nav.Link>
            ))}
          </Nav>
        </Col>
        <Col sm={10}>
          <Outlet />
        </Col>
      </Row>
      <Row>
        <p className="text-end">
          Built by{" "}
          <Link className="link-light" to="https://www.jonwinsley.com/">
            Jon Winsley
          </Link>
        </p>
      </Row>
    </div>
  );
}
