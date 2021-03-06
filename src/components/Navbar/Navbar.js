import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import { fade } from '@material-ui/core/styles/colorManipulator';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
// import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import eventsHub from '../../utils/eventsHub';
import MenuButton from '../Buttons/MenuButton';
import Autocomplete from '../Autocomplete/Autocomplete';

const drawerWidth = 240;

const styles = (theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	},
	drawer: {
		zIndex: theme.zIndex.drawer,
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		hide: {
			display: 'none'
		},
		menuButton: {
			marginLeft: 12,
			marginRight: 36
		},
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1
		}
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	},
	root: {
		display: 'flex',
		width: '100%'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	sectionDesktop: {
		float: 'right',
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	}
});

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			anchorEl: null,
			mobileMoreAnchorEl: null
		};
	}

	handleProfileMenuOpen = (e) => {
		this.setState({ anchorEl: e.currentTarget });
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};

	handleMobileMenuOpen = (e) => {
		this.setState({ mobileMoreAnchorEl: e.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	quickSearch = (e) => {
		if (e.key === 'Enter') {
			eventsHub.setQuickSearch(e.target.value);
		}
	};

	handleSuggestionSelected = (suggestion) => {
		eventsHub.setQuickSearch(suggestion);
	};

	handleDrawerOpen = () => {
		this.setState({ open: !this.state.open });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, theme } = this.props;
		const { anchorEl, mobileMoreAnchorEl } = this.state;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
			</Menu>
		);

		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMobileMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleProfileMenuOpen}>
					<IconButton color="inherit">
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			</Menu>
		);

		return (
			<div className={classes.root}>
				{/* <CssBaseline /> */}
				<AppBar
					position="fixed"
					className={classNames(
						classes.appBar
						// ,{
						// 	[classes.appBarShift]: this.state.open
						// }
					)}
				>
					<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
						<MenuButton color="inherit" ariaLabel="Open drawer" onClick={this.handleDrawerOpen} />
						{/* <IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: this.state.open
							})}
						>
							<MenuIcon />
						</IconButton> */}
						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
							MTG-App
						</Typography>
						<div className={classes.search}>
							{/* <div className={classes.searchIcon}>
								<SearchIcon />
							</div> */}
							<Autocomplete
								onKeyPress={this.quickSearch}
								onSuggestionSelected={this.handleSuggestionSelected}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								quickSearch
							/>
							{/* <InputBase
								placeholder="Search…"
								onKeyPress={this.quickSearch}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
							/> */}
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton
								aria-owns={isMenuOpen ? 'material-appbar' : undefined}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
				{renderMobileMenu}
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open
						})
					}}
					open={this.state.open}
				>
					<IconButton>
						<FilterIcon />
					</IconButton>

					{/* <List>
						{[ 'Inbox', 'Starred', 'Send email', 'Drafts' ].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					{/* </List> */}
					<Divider />
					{/* <List>
						{[ 'All mail', 'Trash', 'Spam' ].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <MailIcon /> : <InboxIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List> */}
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.props.children}
				</main>
			</div>
		);
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);
