import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

export function CrossIcon(props: SvgProps) {
	return (
		<Svg
			width={20}
			height={20}
			viewBox="0 0 20 20"
			fill="none"
			{...props}
		>
			<G clipPath="url(#clip0_11049_7244)">
				<Path
					d="M13.825 15.353L10 11.528l-3.824 3.825a1.082 1.082 0 01-1.53-1.53L8.47 9.998 4.646 6.174a1.082 1.082 0 011.53-1.53L10 8.47l3.825-3.825a1.082 1.082 0 011.53 1.53L11.53 9.998l3.824 3.825a1.082 1.082 0 01-1.53 1.53z"
					fill="#000"
					fillOpacity={1}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_11049_7244">
					<Path fill="#fff" d="M0 0H20V20H0z" fillOpacity={1} />
				</ClipPath>
			</Defs>
		</Svg>
	);
}