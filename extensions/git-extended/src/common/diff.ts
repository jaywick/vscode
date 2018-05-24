import { GitChangeType, RichFileChange } from '../models/file';
import { Repository } from '../models/repository';
import { DiffHunk, getDiffChangeType, DiffLine, DiffChangeType } from '../models/diffHunk';

			diffHunk.diffLines.push(new DiffLine(DiffChangeType.Context, oriStartLine, newStartLine, positionInHunk, line));
	let diffHunks = [];
		diffHunks.push(diffHunk);
	return new RichFileChange(contentPath, originalContentPath, GitChangeType.MODIFY, b, diffHunks);
	let diffHunkReader = parseDiffHunk(modifyDiffInfo);
	let diffHunkIter = diffHunkReader.next();
	let diffHunks = [];

	while (!diffHunkIter.done) {
		let diffHunk = diffHunkIter.value;
		diffHunks.push(diffHunk);
		for (let i = 0, len = diffHunk.diffLines.length; i < len; i++) {
			let diffLine = diffHunk.diffLines[i];
			if (diffLine.type === DiffChangeType.Add) {
				right.push(diffLine.text);
			} else if (diffLine.type === DiffChangeType.Delete) {
				left.push(diffLine.text);
			} else {
				left.push(diffLine.text);
				right.push(diffLine.text);
			}
	return new RichFileChange(contentPath, originalContentPath, GitChangeType.MODIFY, b, diffHunks);
		} else if (review.status === 'removed' || review.status === 'added' || review.status === 'renamed') {
			if (!review.patch) {
				continue;

			let gitChangeType = GitChangeType.UNKNOWN;
			switch (review.status) {
				case 'removed':
					gitChangeType = GitChangeType.DELETE;
					break;
				case 'added':
					gitChangeType = GitChangeType.ADD;
					break;
				case 'renamed':
					gitChangeType = GitChangeType.RENAME;
					break;
				default:
					break;
			}

			let fileName = review.filename;
			let prDiffReader = parseDiffHunk(review.patch);
			let prDiffIter = prDiffReader.next();
			let diffHunks = [];

			while (!prDiffIter.done) {
				let diffHunk = prDiffIter.value;
				diffHunks.push(diffHunk);
				for (let j = 0, len = diffHunk.diffLines.length; j < len; j++) {
					let diffLine = diffHunk.diffLines[j];
					if (diffLine.type !== DiffChangeType.Control) {
						contentArray.push(diffLine.text);
					}
				prDiffIter = prDiffReader.next();

			let contentFilePath = await writeTmpFile(contentArray.join('\n'), path.extname(fileName));
			let emptyContentFilePath = await writeTmpFile('', path.extname(fileName));
			let richFileChange = review.status === 'removed' ?
				new RichFileChange(emptyContentFilePath, contentFilePath, gitChangeType, fileName, diffHunks) :
				new RichFileChange(contentFilePath, emptyContentFilePath, gitChangeType, fileName, diffHunks);