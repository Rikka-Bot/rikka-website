"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/NavBar.module.css";

import {
  HomeIcon,
  DiscordLogoIcon,
  InfoCircledIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";

export default function Navbar() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Rikka"
          />
          <h1>Rikka</h1>
        </div>

        {/* Desktop */}
        <div className={styles.desktop}>
          <ul className={styles.link_items}>
            <li>
              <Link href="/">
                <HomeIcon /> Home
              </Link>
            </li>

            <li>
              <Link href="/suporte">
                <DiscordLogoIcon /> Suporte
              </Link>
            </li>

            <li>
              <Link href="/sobre">
                <InfoCircledIcon /> Sobre
              </Link>
            </li>
          </ul>

          <a href={`${apiUrl}/auth/discord`}>
            <Button variant="contained">LOGIN</Button>
          </a>
        </div>

        {/* Mobile */}
        <IconButton
          className={styles.mobileButton}
          onClick={() => setOpen(true)}
        >
          <HamburgerMenuIcon width={24} height={24} />
        </IconButton>
      </nav>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 260 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="🏠 Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/suporte"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="🎮 Suporte" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/sobre"
                onClick={() => setOpen(false)}
              >
                <ListItemText primary="ℹ️ Sobre" />
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                href={`${apiUrl}/auth/discord`}
              >
                LOGIN
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}