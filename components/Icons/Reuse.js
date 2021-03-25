export const Reuse = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={500}
            height={500}
            style={{
                width: "100%",
                height: "100%",
            }}
            {...props}
        >
            <defs>
                <clipPath id="prefix__a">
                    <path d="M0 0h500v500H0z" />
                </clipPath>
            </defs>
            <g
                display="block"
                clipPath="url(#prefix__a)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={12.6}
                fill="none"
            >
                <path
                    stroke="#121331"
                    d="M134.98 126.62c-.009 4.937-.013 11.61-.018 18.913l-.163 251.875c-.01 14.9 12.082 27 26.983 27h181.003c14.902 0 26.976-12.1 26.946-27l-.507-250.192c-.019-9.206-.037-17.496-.055-22.603"
                />
                <path
                    stroke="#09F"
                    d="M193.66 190.952v155.907m58.671-155.907v155.907m58.41-155.907v155.907M112.39 117.688l278.815.764m-183.384-6.601c3.052-21.874 21.857-38.74 44.568-38.74 0 0 0 0 0 0 21.191 0 38.98 14.679 43.745 34.411"
                />
            </g>
        </svg>
    );
};
