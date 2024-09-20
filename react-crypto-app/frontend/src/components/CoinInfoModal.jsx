import { Divider, Flex, Tag, Typography } from 'antd'
import CoinInfo from './coinInfo'

const CoinInfoModal = ({ coin }) => {
	return (
		<>
			<CoinInfo coin={coin} withSymbol />
			<Divider />
			<Typography.Paragraph style={{ textAlign: 'center' }}>
				<Typography.Text strong>1 hour : </Typography.Text>
				<Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
					{coin.priceChange1h}%
				</Tag>
				<Typography.Text strong>1 day : </Typography.Text>
				<Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
					{coin.priceChange1d}%
				</Tag>
				<Typography.Text strong>1 week : </Typography.Text>
				<Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
					{coin.priceChange1w}%
				</Tag>
			</Typography.Paragraph>

			<Typography.Paragraph
				style={{
					padding: '0 10px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Typography.Text strong>Price : </Typography.Text>
				<span
					style={{
						color: 'darkgoldenrod',
					}}
				>
					{coin.price.toFixed(2)}$
				</span>
			</Typography.Paragraph>

			<Typography.Paragraph
				style={{
					padding: '0 10px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Typography.Text strong>Price BTC : </Typography.Text>
				<span
					style={{
						color: 'darkgoldenrod',
					}}
				>
					{coin.priceBtc}
				</span>
			</Typography.Paragraph>

			<Typography.Paragraph
				style={{
					padding: '0 10px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Typography.Text strong>Market Cap : </Typography.Text>
				<span
					style={{
						color: 'darkgoldenrod',
					}}
				>
					{coin.marketCap}$
				</span>
			</Typography.Paragraph>

			{coin.contractAddress && (
				<Typography.Paragraph
					style={{
						padding: '0 10px',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography.Text strong>Contract Address : </Typography.Text>
					<span
						style={{
							width: 300,
							color: 'darkgoldenrod',
						}}
					>
						{coin.contractAddress}
					</span>
				</Typography.Paragraph>
			)}
		</>
	)
}

export default CoinInfoModal
