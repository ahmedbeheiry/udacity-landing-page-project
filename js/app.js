/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('main section');
let headerHt = 0;

window.addEventListener('load', () => {
	headerHt = document.querySelector('.page__header').clientHeight;
});

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const createNavItem = (href, itemContent) => {
	const li = document.createElement('li');
	const anchorTag = document.createElement('a');
	anchorTag.setAttribute('href', `#${href}`);
	anchorTag.className = 'menu__link';
	anchorTag.textContent = itemContent;
	li.appendChild(anchorTag);
	return li;
};

const setActive = (sectionIndex) => {
	sections[sectionIndex].classList.add('active');
	document.querySelectorAll('#navbar__list li')[sectionIndex].classList.add('active');
};

const removeActive = (sectionIndex) => {
	sections[sectionIndex].classList.remove('active');
	document.querySelectorAll('#navbar__list li')[sectionIndex].classList.remove('active');
};

const removeAllActive = () => {
	sections.forEach((section) => section.classList.remove('active'));
	document.querySelectorAll('#navbar__list li').forEach((item) => item.classList.remove('active'));
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const navInit = () => {
	const fragment = document.createDocumentFragment();

	sections.forEach((section) => {
		const itemAnchor = section.getAttribute('id');
		const itemContent = section.getAttribute('data-nav');
		const li = createNavItem(itemAnchor, itemContent);
		fragment.appendChild(li);
	});

	navList.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const detectActiveSection = () => {
	const secReversedIndex = [...sections].reverse().findIndex((section) => window.scrollY + 1 >= section.offsetTop - headerHt);
	console.log(secReversedIndex);
	if (secReversedIndex >= 0) {
		const currentIndex = sections.length - secReversedIndex - 1;
		removeAllActive();
		setActive(currentIndex);
	} else {
		removeAllActive();
	}
};

// Scroll to anchor ID using scrollTO event
const handleLinkClick = (e) => {
	e.preventDefault();
	const sectionId = e.target.getAttribute('href');
	const section = document.querySelector(sectionId);
	window.scrollTo({
		top: section.offsetTop,
		behavior: 'smooth',
	});
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
navInit();

// Scroll to section on link click
const menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach((link) => link.addEventListener('click', handleLinkClick));

// Set sections as active
window.addEventListener('scroll', detectActiveSection);
